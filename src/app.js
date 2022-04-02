console.log('hello');

function go() {
  const bundleId = location.search.split('=')[1];
  console.log('bundleId', bundleId);
  if (!bundleId) return;

  const app = fetch(`/.netlify/functions/get-app?bundleId=${bundleId}`)
    .then((res) => res.json())
    .then((app) => {
      console.log('app', app);
      const inline = new MozActivity({
        name: 'open-app',
        data: {
          url: app.manifest_url,
          type: 'url',
          appName: app.name,
        },
      });
      inline.onerror = (e) => {
        console.log('err', e);
        new MozActivity({
          name: 'open-page',
          data: {
            url: app.manifest_url,
            type: 'url',
            appName: app.name,
          },
        });
      };
      //   new MozActivity({
      //     name: 'open-app',
      //     data: {
      //       url: app.manifest_url,
      //       type: 'url',
      //       appName: app.name,
      //     },
      //   });
    });
}
go();

document.querySelector('#btnOpenStore').addEventListener('click', go);
