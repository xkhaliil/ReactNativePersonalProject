import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default defineConfig(
  globalIgnores(["dist/", "web-build/"]),
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
