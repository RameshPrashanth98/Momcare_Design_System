/**
 * NativeModules polyfill for jest-expo@54 + react-native@0.76+ compatibility.
 *
 * Context: jest-expo/src/preset/setup.js line 10 does:
 *   const mockNativeModules = require('react-native/Libraries/BatchedBridge/NativeModules').default;
 *
 * react-native@0.76 NativeModules.js uses `module.exports = NativeModules` (CJS).
 * The jest.mock() in react-native/jest/setup.js returns a plain object without .default.
 * This causes Object.defineProperty to throw since mockNativeModules is undefined.
 *
 * This file is used via moduleNameMapper to intercept the require and add __esModule + default.
 * We provide the same mock structure that react-native/jest/setup.js provides, plus .default.
 */

'use strict';

// Re-use the mock factory from react-native/jest/setup.js by calling jest.requireActual
// on the actual NativeModules mock (which is the result of jest.mock in setup.js).
// Since we're in moduleNameMapper, we need to build the mock from scratch.

const nativeModulesMock = {
  // Required by jest-expo/src/preset/setup.js line 119:
  // Object.keys(mockNativeModules.NativeUnimoduleProxy.viewManagersMetadata)
  NativeUnimoduleProxy: {
    viewManagersMetadata: {},
    callMethod: jest.fn(() => Promise.resolve()),
    exportedMethods: {},
    exportedConstants: {},
  },
  // Required by jest-expo/src/preset/setup.js line 121:
  // Object.defineProperty(mockNativeModules.UIManager, ...)
  UIManager: {
    getViewManagerConfig: jest.fn(() => null),
    hasViewManagerConfig: jest.fn(() => false),
    createView: jest.fn(),
    updateView: jest.fn(),
    manageChildren: jest.fn(),
    dispatchViewManagerCommand: jest.fn(),
    measure: jest.fn(),
    measureInWindow: jest.fn(),
    measureLayout: jest.fn(),
    setJSResponder: jest.fn(),
    clearJSResponder: jest.fn(),
    configureNextLayoutAnimation: jest.fn(),
    getConstants: jest.fn(() => ({})),
  },
  // Standard RN mocks:
  AlertManager: { alertWithArgs: jest.fn() },
  AsyncLocalStorage: {
    multiGet: jest.fn((keys, cb) => process.nextTick(() => cb(null, []))),
    multiSet: jest.fn((entries, cb) => process.nextTick(() => cb(null))),
    multiRemove: jest.fn((keys, cb) => process.nextTick(() => cb(null))),
    multiMerge: jest.fn((entries, cb) => process.nextTick(() => cb(null))),
    clear: jest.fn(cb => process.nextTick(() => cb(null))),
    getAllKeys: jest.fn(cb => process.nextTick(() => cb(null, []))),
  },
  DeviceInfo: {
    getConstants: () => ({
      Dimensions: {
        window: { fontScale: 2, height: 1334, scale: 2, width: 750 },
        screen: { fontScale: 2, height: 1334, scale: 2, width: 750 },
      },
    }),
  },
  DevSettings: { addMenuItem: jest.fn(), reload: jest.fn() },
  Networking: {
    sendRequest: jest.fn(),
    abortRequest: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  },
  PlatformConstants: {
    getConstants: () => ({
      reactNativeVersion: { major: 0, minor: 76, patch: 9 },
    }),
  },
  // Linking
  Linking: {
    openURL: jest.fn(() => Promise.resolve()),
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    getInitialURL: jest.fn(() => Promise.resolve(null)),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    sendIntent: jest.fn(),
    openSettings: jest.fn(() => Promise.resolve()),
  },
};

module.exports = {
  __esModule: true,
  default: nativeModulesMock,
  ...nativeModulesMock,
};
