# Piano Flash

## Features
- Learn piano using flashcards
- Perform music score with real-time feedback

## Installation Prerequisite
- PianoFlash requires [Node](https://nodejs.org/en/download/) version: v14.20.1 to run
- Download [osmd-extended-master](https://github.com/opensheetmusicdisplay)

## Windows Install

```sh
cd C:\PianoFlash\
git clone https://github.com/JanVeb/piano-flash.git
```

Move **osmd-extended-master** in the same directory where the clone is placed

#### Example:
PianoFlash
&ensp;|--osmd-extended-master
&ensp;|--piano-flash
&emsp;&emsp;|--package.json

Verify **package.json** contains entry: "osmd-extended": "file:../osmd-extended-master",

#### Run Command Prompt as Administrator
```sh
cd osmd-extended-master
npm install
npm run build
```

#### Run Command Prompt as Administrator
```sh
cd piano-flash
npm install
```

#### Using non-privileged Command Prompt
```sh
cd piano-flash
npm start
```

## Launch app in Chrome web browser
[http://localhost:3000](http://localhost:3000)