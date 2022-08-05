const fs = require('fs');
const { spglslAngleCompile } = require('spglsl');

const convertError = (e) => ({
    text: e.toString(),
    location: {
        file: e.filePath,
        line: e.line,
        column: 0,
        lineText: e.source,
    },
});

module.exports = ({
    compileMode = 'Optimize',
    minify = false,
    mangle = false,
    mangle_global_map
} = {}) => ({
    name: 'spglsl',
    setup(build) {
        build.onLoad(
            { filter: /\.(?:frag|vert|glsl)$/ },
            async (args) => {
                const contents = await fs.promises.readFile(args.path, 'utf8');
                const errors = [];
                const warnings = [];

                const result = await spglslAngleCompile({
                    mainFilePath: args.path,
                    mainSourceCode: contents,
                    compileMode,
                    minify,
                    mangle,
                    mangle_global_map,
                });

                if (!result.valid) {
                    result.infoLog.forEach((e) => {
                        if (e.type === 'ERROR' || e.type === 'UNKNOWN ERROR') {
                            errors.push(convertError(e));
                        }
                        else if (e.type === 'WARNING') {
                            warnings.push(convertError(e));
                        }
                    })
                }

                if (errors.length > 0 || warnings.length > 0) {
                    return { errors, warnings };
                }

                return {
                    contents: result.output,
                    loader: 'text',
                }
            },
        );
    },
});
