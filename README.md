
# react-native-rn-inka-element

## Getting started

`$ npm install react-native-rn-inka-element --save`

### Mostly automatic installation

`$ react-native link react-native-rn-inka-element`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-rn-inka-element` and add `RNRnInkaElement.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRnInkaElement.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNRnInkaElementPackage;` to the imports at the top of the file
  - Add `new RNRnInkaElementPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-rn-inka-element'
  	project(':react-native-rn-inka-element').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-rn-inka-element/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-rn-inka-element')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNRnInkaElement.sln` in `node_modules/react-native-rn-inka-element/windows/RNRnInkaElement.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Rn.Inka.Element.RNRnInkaElement;` to the usings at the top of the file
  - Add `new RNRnInkaElementPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNRnInkaElement from 'react-native-rn-inka-element';

// TODO: What to do with the module?
RNRnInkaElement;
```
  