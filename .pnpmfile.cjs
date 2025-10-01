module.exports = {
  hooks: {
    afterAllResolved: (lockfile) => {
      lockfile.packages = lockfile.packages || {};
      lockfile.packages["@tailwindcss/oxide"] = { allowScripts: true };
      lockfile.packages["sharp"] = { allowScripts: true };
      return lockfile;
    },
  },
};
