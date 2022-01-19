/**
 * Custom angular webpack configuration
 */
 var path = require('path');
module.exports = (config, options) => {
    config.target = 'electron-renderer';


    if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (fileReplacementParts.length > 1 && ['web'].indexOf(fileReplacementParts[1]) >= 0) {
                config.target = 'web';
            }
            break;
        }
    }

   /* config.module.rules.push({
        test: /\.mp3$/,
        loader: 'file-loader',
        
        include: 'assets/sounds/senial_compra.mp3' ,
       
    });*/
     
    return config;
}
