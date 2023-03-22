
window.example.addUpdateMSGHandler((event, data) => {
  console.log(data);
  updateMessage.textContent = data;
});

window.example.addVersionMSGHandler((event, version) => {
  updateVersion.textContent = version;
  console.log(version);
});
