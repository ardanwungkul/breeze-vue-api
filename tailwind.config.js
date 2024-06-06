const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                customLightPurple: '#F3F2F8',
                semupink : '#ee2761',
                brownshop : '#F4F0ED',
                darkbrownshop : '#D19C97',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
}
