function openStore() {
  const bundleId = location.search.split('=')[1];
  if (!bundleId) return;

  const isDevice = !!window.MozActivity;
  if (!isDevice) {
    location.replace(`https://www.kaiostech.com/store/apps/?bundle_id=${bundleId}`);
    return;
  }

  fetch(`/.netlify/functions/get-app?bundleId=${bundleId}`)
    .then((res) => res.json())
    .then((app) => {
      const activity = new MozActivity({
        name: 'open-app',
        data: {
          url: app.manifest_url,
          type: 'url',
          appName: app.name,
        },
      });
      activity.onerror = () => {
        new MozActivity({
          name: 'open-page',
          data: {
            url: app.manifest_url,
            type: 'url',
            appName: app.name,
          },
        });
      };
    });
}

openStore();
