exports.getExampleTemplate = function(dynamicCode) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>example</title>
    </head>
    <body>
        <script type="module">
            async function fetchCode(path, onSuccess) {
                return fetch(path)
                    .then(res => res.text())
                    .then(utilsCode => {
                        eval(utilsCode);
                        onSuccess && onSuccess();
                    })
                    .catch(err => {
                        console.log('err: ', err);
                    });
            }
    
            await fetchCode('/tian', () => {
                var UTILS = 'tian-utils';
                window.utils = window[UTILS];
            });
    
${dynamicCode}
        </script>
    </body>
</html>`
}