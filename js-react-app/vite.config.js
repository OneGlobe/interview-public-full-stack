import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4000
  },
  resolve: {
    alias: [
      {
        find: 'uswds-elements/lib/normalize',
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/packages/uswds-elements/lib/_normalize.scss`
      },
      {
        find: 'uswds-core/src/styles/mixins/utility-builder',
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/packages/uswds-core/src/styles/mixins/_utility-builder.scss`
      },
      {
        find: /^(uswds-core\/src\/styles\/(tokens|settings|functions|mixins\/typography))$/,
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/packages/$&/_index.scss`
      },
      {
        find: /^uswds-core\/src\/styles\/tokens\/.*$/,
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/packages/$&/_index.scss`
      },
      {
        find: /^(uswds|usa)-.*\/src\/styles$/,
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/packages/$&/_index.scss`
      },
      {
        find: /^(uswds|usa)[^/]*$/,
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/packages/$&/_index.scss`
      },
      {
        find: /^(uswds|usa).*\/.*$/,
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/packages/$&.scss`
      },
      {
        find: /^\.\.\/img\/(.*)$/,
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/dist/img/$&`
      },
      {
        find: /^\.\.\/fonts\/(.*)$/,
        // eslint-disable-next-line no-undef
        replacement: `${__dirname}/node_modules/@uswds/uswds/dist/fonts/$&`
      }
    ]
  },
  plugins: [react()],
  // only applies when running npm test from this packages/web folder
  test: {
    environment: 'happy-dom'
  }
})
