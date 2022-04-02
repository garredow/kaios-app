console.log('hello');

async function go() {
  const bundleId = new URLSearchParams(location.search).get('q');
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

go();
