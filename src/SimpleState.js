import { useState, useEffect } from 'react';

export default class SimpleState {
    states = {};

    /**
     * Helper method used to get data associated with a state and initialize it if needed.
     * @param {string} name 
     * @param {*} value 
     * @private
     */
    initState(name, value) {
        if (this.states[name]) {
            return this.states[name];
        }
        this.states[name] = { value, subscribers: new Set(), components: new Set() };
        return this.states[name];
    }

    /**
     * Subscribes to a state. The function is the subscription key.
     * @param {string} state 
     * @param {function<string, *>} subscriber A function that accepts the name of a state and its new value whenever state changes.
     */
    subscribe(state, subscriber) {
        this.initState(state).subscribers.add(subscriber);
    }

    /**
     * Unsubscribes from a state. The function is the subscription key.
     * @param {string} state 
     * @param {function<string, *>} subscriber 
     */
    unsubscribe(state, subscriber) {
        this.initState(state).subscribers.delete(subscriber);
    }

    /**
     * Deletes the value of the state. Does not delete subscriptions.
     * @param {string} state 
     */
    delete(state) {
        if (!this.states[state]) {
            return;
        }
        const stateData = this.states[state];
        delete stateData.value;
    }

    /**
     * Sets state in a component directly. Do not use once mounted.
     * @param {React.Component} component The component to bind to the states.
     * @param {Array<string>} states The list of states to bind.
     * @param {string=} container An object that should contain the states. Access states via this.state.<container>.<state> instead of this.state.<state>.
     */
    loadStates(component, states, container) {

        component.state = component.state || {};
        let updateState = null;
        if (container) {
            updateState = {};
            component.state[container] = updateState;
        }
        else {
            updateState = component.state;
        }
        states.forEach((state) => {
            updateState[state] = this.getState(state);
        });
    }

    /** @type{React.Component} React components that are bound to states. */
    components = new Map();
    /**
     * Binds states in a component to SimpleState instance. Use in componentWillMount or after.
     * Don't forget to unbind when class is unmounted.
     * @param {React.Component} component The component to bind to the states.
     * @param {Array<string>} states The list of states to bind.
     * @param {string=} container An object that should contain the states. 
     *  Access states via this.state.<container>.<state> instead of this.state.<state>.
     */
    bindStates(component, states, container) {
        if (!this.components.has(component)) {
            this.components.set(component, {
                states: new Set(), containers: new Map()
            });
            const compData = this.components.get(component);
            compData.subscriber = (name, value) => {
                if (compData.containers.has(name)) {
                    const containerName = compData.containers.get(name);
                    const updatedState = (component.state || {})[containerName] || {};
                    updatedState[name] = value;
                    component.setState(updatedState);
                } else {
                    const newValue = {};
                    newValue[name] = value;
                    component.setState(newValue);
                }
            };
        }
        const compData = this.components.get(component);
        const initialStateObj = {};
        states.forEach((state) => {
            compData.states.add(state);
            if (container) {
                compData.containers.set(state, container);
            }
            const stateData = this.initState(state);
            stateData.subscribers.add(compData.subscriber);
            stateData.components.add(component);
            initialStateObj[state] = this.states[state];
        });
        if (container) {
            const newState = {};
            newState[container] = initialStateObj;
            component.setState(newState);
        }
        else {
            component.setState(initialStateObj);
        }
    }

    /**
     * Unbinds a class based React component from states.
     * @param {React.Component} component The component to unbind from the states.
     * @param {Array<string>=} states The list of states to unbind. If not set, unbinds all states.
     */
    unbindStates(component, states) {
        if (!this.components.has(component)) {
            return;
        }
        const compData = this.components.get(component);
        if (!states) {
            states = compData.states;
        }
        states.forEach((state) => {
            const stateData = this.initState(state);
            stateData.subscribers.delete(compData.subscriber);
            stateData.components.delete(component);
            compData.states.delete(state);
            compData.containers.delete(state);
        });
        if (!compData.states.length) {
            this.components.delete(component);
        }
    }

    /**
     * Sets state in the classic React fashion.
     * @param {{*}} stateObj 
     */
    mergeState(stateObj) {
        Object.keys(stateObj).forEach((key) => {
            this.setState(key, stateObj[key]);
        });
    }

    /**
     * Sets a single named state.
     * @param {string} name 
     * @param {*} value 
     */
    setState(name, value) {
        const state = this.initState(name, value);
        state.value = value;
        state.subscribers.forEach((subscriber) => {
            subscriber(name, value);
        });
    }

    /**
     * Gets the canonical value of the named state.
     * @param {string} name 
     */
    getState(name) {
        if (!this.states[name]) {
            return;
        }
        return this.states[name].value;
    }

    /**
     * Binds a function based React component to a state.
     * No need to unbind as this is handled automatically.
     * @param {string} name 
     * @param {*} initialValue 
     */
    useState(name, initialValue) {
        const state = this.initState(name, initialValue);
        const [value, setValue] = useState(this.states[name].value);
        useEffect(() => {
            function subscriber(name, value) {
                setValue(value);
            }
            state.subscribers.add(subscriber);
            return () => {
                state.subscribers.delete(subscriber);
            }
        });
        return [value, (val) => this.setState(name, val)];
    }
}

export const simpleState = new SimpleState();
