import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"

export default defineConfig(
  globalIgnores(["dist/", "web-build/"]),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  config,
  {
    // configs overrides, if need
  },
  {
    // CommonJS config files (babel.config.cjs, jest.config.cjs) need Node globals.
    files: ["*.cjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
)
