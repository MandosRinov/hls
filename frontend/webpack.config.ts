import webpack from 'webpack';
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface EnvVariables {
    mode: "development" | "production";
}

export default (env: EnvVariables) => {

    const isDev = env.mode === "development";

    return {
        entry: path.resolve(__dirname, "src", 'index.tsx'),
        mode: isDev ? "development" : "production",
        output: {
            filename: "[name].bundle.[hash:8].js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.module.css$/i,
                    use: [MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: {
                            modules: {
                              localIdentName: isDev ? "[path][name]__[local]" :"[hash:base64:5]",
                            },
                        },

                    }],
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    type: "asset/resource",
                },
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                "@assets": path.resolve(__dirname, "src", "assets"),
                "@utils": path.resolve(__dirname, "src", "utils"),
            }
        },
        plugins: [
            new MiniCssExtractPlugin({}),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html")
            }),
            new webpack.DefinePlugin({
                __SERVER_URL__: isDev ? JSON.stringify("http://localhost:8080") : JSON.stringify("http://localhost:8080"),
            })
        ],
        devServer: {
            port: 3000,
            open: true,
            historyApiFallback: true,
        }
    }
}