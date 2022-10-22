import React, { useState, useEffect, useReducer, useRef } from 'react';

export const encryptData = async (
  data,
  keys,
  sea
) => {
  return keys && sea ? sea.encrypt(data, keys) : Promise.resolve(data);
};

export const decryptData = async (
  data,
  keys,
  sea
) => {
  return keys && sea ? sea.decrypt(data, keys) : Promise.resolve(data);
};


export const useGun = (Gun, opts) => {
  const [gun, setGun] = useState(Gun({ ...opts }));

  useEffect(() => {
    if (opts) {
      setGun(Gun({ ...opts }));
    }
  }, [Gun, opts]);

  return gun;
};

export const useGunNamespace = (gun, soul) => {
  const [namespace, setNamespace] = useState(
    soul ? gun.user(soul) : gun.user()
  );
  useEffect(() => {
    if (gun && !namespace) {
      setNamespace(soul ? gun.user(soul) : gun.user());
    }
  }, [namespace, gun, soul]);
  return namespace;
};

export const useGunKeyAuth = (
  gun,
  keys,
  triggerAuth = true
) => {
  // Will attempt to perform a login (when triggerAuth is set to true),
  // or, if false, returns a namespaced gun node
  const namespacedGraph = useGunNamespace(gun);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  gun.on('auth', () => {
    setIsLoggedIn(true);
  });

  useEffect(() => {
    if (namespacedGraph && !namespacedGraph.is && keys && triggerAuth) {
      namespacedGraph.auth(keys);
    }
  }, [triggerAuth, namespacedGraph, keys]);

  return [namespacedGraph, isLoggedIn];
};

export const useGunKeys = (
  sea,
  existingKeys
) => {
  const [newKeys, setNewKeys] = useState(
    existingKeys
  );

  useEffect(() => {
    async function getKeySet() {
      const pair = await sea.pair();
      setNewKeys(pair);
    }

    if (!newKeys && !existingKeys) {
      getKeySet();
    }

    if (existingKeys) {
      setNewKeys(existingKeys);
    }
  }, [existingKeys, newKeys, sea]);

  return newKeys;
};
