export default function Alert(msg) {
  new Notification(document.title, { 
    tag: document.title,
    body: msg,
    icon: 'favicon.ico'
  });
}