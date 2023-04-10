/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                greentheme: {
                    primary: '#4f4bd1',

                    secondary: '#77f9ef',

                    accent: '#b08ad8',

                    neutral: '#1F1B22',

                    'base-100': '#344656',

                    info: '#9AB9EA',

                    success: '#71EFAC',

                    warning: '#F9A939',

                    error: '#FB120E',
                },
                pinktheme: {
                    primary: '#e567b0',

                    secondary: '#f4b7ba',

                    accent: '#a5f7ab',

                    neutral: '#141B24',

                    'base-100': '#3B3748',

                    info: '#88E0F2',

                    success: '#2ED19D',

                    warning: '#A56D0D',

                    error: '#E46278',
                },
            },
        ],
    },
};
