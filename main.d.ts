import { SpglslCompileMode } from "spglsl/dist";

declare function spglslPlugin (options?: {
    // spglsl compile mode. Default: 'Optimize'
    compileMode?: SpglslCompileMode;
    // Default: false
    minify?: boolean;
    // Default: false
    mangle?: boolean;
    mangle_global_map: { [key: string]: string };
}): {
    name: string;
    setup(build: any): void;
};

export = spglslPlugin;
