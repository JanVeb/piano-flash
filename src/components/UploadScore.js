import { FileDownload } from 'capacitor-plugin-filedownload';

import React, { useState } from 'react';

export default function UploadScore() {
  let [path, setPath] = useState(undefined);

  let res = FileDownload.download({
    uri: 'https://github.com/JanVeb/Piano-Scores/blob/main/Fur_Elise_1-2M.xml',
    fileName: 'Fur_Elise_1-2M.xml', //.xml
  })
    .then((res) => {
      setPath(res.path);
      console.log('path2:');
      console.log(res.path);
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
    });

  return <h1> {path}</h1>;
}
