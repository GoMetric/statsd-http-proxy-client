const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "65",
                safari: "11.1",
            },
            useBuiltIns: "usage",
            modules: "umd",
        },
    ],
];

const plugins = [
    [
        "@babel/plugin-transform-classes",
        {
            "loose": true
        }
    ]
];

module.exports = {
    presets,
    plugins
};