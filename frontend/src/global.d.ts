declare module "*.module.css" {
    interface Class {
        [className : string] : string
    }
    const classNames: Class
    export = classNames
}

declare module "*.svg"
declare module "*.png"
declare module "*.jpg"


declare const __SERVER_URL__: string