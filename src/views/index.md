# HTML Converter Service

## Getting Started

* [Demo](https://developersworkspace.co.za/projects/html-converter)
* [API Documentation](https://html-converter.openservices.co.za/api/docs/)
* [Source Code](https://github.com/barend-erasmus/html-converter-service)
* [Coverage Report](https://html-converter.openservices.co.za/api/coverage/)

## Convert HTML to PDF

### Vanilla Javascript

```javascript
const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://html-converter.openservices.co.za/api/convert/topdf', true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function (e) {

        if (this.status == 200) {
            const blobObject = new Blob([this.response], { type: 'application/pdf' });
            
            const fileReader = new FileReader();

            fileReader.onload = function(e) {
                window.location.href = e.target.result;
            };
            fileReader.readAsDataURL(blobObject);
        }
    };

    xhr.send(JSON.stringify({
            html: "<p>Hello World</p>"
    }));
```

## Convert HTML to PNG

### Vanilla Javascript

```javascript
const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://html-converter.openservices.co.za/api/convert/topng', true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function (e) {

        if (this.status == 200) {
            const blobObject = new Blob([this.response], { type: 'image/png' });
            
            const fileReader = new FileReader();

            fileReader.onload = function(e) {
                window.location.href = e.target.result;
            };
            fileReader.readAsDataURL(blobObject);
        }
    };

    xhr.send(JSON.stringify({
            html: "<p>Hello World</p>"
    }));
```
