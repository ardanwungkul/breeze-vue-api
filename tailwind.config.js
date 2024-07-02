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
                semupink: '#ee2761',
                brownshop: '#F4F0ED',
                darkbrownshop: '#D19C97',
                'ezzora-50': '#f8f8f6',
                'ezzora-100': '#edede7',
                'ezzora-200': '#d9d8cf',
                'ezzora-300': '#c1c1b0',
                'ezzora-400': '#a7a490',
                'ezzora-500': '#969279',
                'ezzora-600': '#89836d',
                'ezzora-700': '#726c5c',
                'ezzora-800': '#5e594e',
                'ezzora-900': '#4e4a40',
                'ezzora-950': '#292721',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
}
