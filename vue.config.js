module.exports = {
    pwa: {
        themeColor: "#c1c1c1",
        msTileColor: "#c1c1c1",
        appleMobileWebAppCache: "yes",
        manifestOptions: {
            name: "SAPIP Incidencias",
            short_name: "SAPIP Incidencias",
            background_color: "#343a40 ",
            theme_color: "#ffffff",
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "SAPIP Incidencias";
                args[0].version = require('./package.json').version;
                return args
            })
    },
};