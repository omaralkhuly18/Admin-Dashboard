export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for Light mode

            }
            // palette values for dark mode
            : {

            }),
    },
});