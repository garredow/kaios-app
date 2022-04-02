console.log('hello');

async function go() {
  const bundleId = location.search.split('=')[1];
  console.log('bundleId', bundleId);
  if (!bundleId) return;

  const app = await fetch(`/.netlify/functions/get-app?bundleId=${bundleId}`).then((res) =>
    res.json()
  );
  console.log('app', app);

  new MozActivity({
    name: 'open-app',
    data: {
      url: app.manifest_url,
      type: 'url',
      appName: app.name,
    },
  });
}

document.querySelector('#btnOpenStore').addEventListener('click', go);
