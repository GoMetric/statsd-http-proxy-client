# StatsD HTTP Proxy StatsdProxyClient

JavaScript client for [statsd-http-proxy](https://github.com/GoMetric/statsd-http-proxy) for using in browsers.

## Installation

### Through npm

```
npm i @gometric/statsd-http-proxy-client
```

## Basic usage

Library uses `fetch` so to support old browsers you need [fetch polyfill](https://github.com/github/fetch).

### UMD loader

```html
<!--- fetch polyfill --->
<script src="fetch.umd.js"></script>
<!--- proxy --->
<script src="StatsDHttpProxy.js"></script>

<script type="text/javascript">
    (function() {
        var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE1MTk0MjE1NDIsImV4cCI6MTg2NjU3Njc0MiwiYXVkIjoiIiwic3ViIjoiIiwiR3JlZXRpbmciOiJIZWxsbywgZGVzY2VuZGFudHMifQ.n2qI2Ar9KzL3IsmlHjZAQmrf_Iz2ugnplwNIl4ELlDk';
        var statsdHttpProxyHost = 'http://localhost:8080';
        
        var client = new StatsDHttpProxy.Client(statsdHttpProxyHost, token);
        client.count('some.key', 42);
        client.timing('some.key', 4200);
    })();
</script>
```