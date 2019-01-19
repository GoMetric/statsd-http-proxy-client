'use strict';

import 'whatwg-fetch';

class Client {
    /**
     * @param {string} proxyHost in format "https://server.com:8080/"
     * @param {string} jwtToken
     */
    constructor(proxyHost, jwtToken) {
        this.proxyHost = proxyHost;
        this.jwtToken = jwtToken;
    }

    /**
     * @param {string} name
     * @param {int} value Negative to decrease
     * @param {double} sampleRate Sample rate to skip metrics from 0 to 1
     */
    count(name, value, sampleRate) {
        this._send(
            'count',
            name,
            {
                value,
                sampleRate
            }
        );
    }

    /**
     * @param {string} name
     * @param {int} value
     * @param {int} shift Signed int, relative to previously stored value
     */
    gauge(name, value, shift) {
        this._send(
            'gauge',
            name,
            {
                value,
                shift
            }
        );
    }

    /**
     * @param {string} name
     * @param {int} time Time in milliseconds
     * @param {double} sampleRate Sample rate to skip metrics from 0 to 1
     */
    timing(name, time, sampleRate) {
        this._send(
            'timing',
            name,
            {
                time,
                sampleRate
            }
        );
    }

    /**
     * @param {string} name
     * @param {int} value
     */
    set(name, value) {
        this._send(
            'timing',
            name,
            {
                value
            }
        );
    }

    /**
     * @private
     *
     * @param {string} metricType One of 'count', 'gauge', 'timing', 'set'
     * @param {string} metricName Metric name in dot-notation like "cluster1.node2.cpu.load"
     * @param {object} metric
     *
     * @returns {Promise}
     */
    _send(metricType, metricName, metric) {
        let headers = {};

        if (this.jwtToken) {
            headers['X-JWT-Token'] = this.jwtToken;
        }

        // build query string
        let query = [];
        for (let key in metric) {
            if (metric[key]) {
                query.push(key + '=' + metric[key]);
            }
        }

        // build url
        let url = this.proxyHost + '/' + metricType + '/' + metricName;

        let body = query.length > 0 ? query.join('&') : null;

        return fetch(
            url,
            {
                method: 'POST',
                headers: headers,
                body: body,
                mode: 'cors',
                credentials: 'omit',
                cache: 'no-cache',
                redirect: 'error'
            }
        );
    }
}

export { Client };
