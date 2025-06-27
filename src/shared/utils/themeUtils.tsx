// src/shared/utils/themeUtils.tsx
import { useContext } from 'react'
import { Theme, ThemeContext } from 'src/shared/lib/shadcn/components/ThemeContext.tsx'
import { oklchToHex } from 'src/shared/utils/color.tsx'


const VARS_KEY = 'vite-ui-theme-vars'


// 테마 확인, 테마 수정, 다크모드 여부 Hook
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    const { theme, setTheme } = context
    const isDarkTheme = theme === 'dark'
    return {
        theme,
        setTheme,
        isDarkTheme,
    }
}


// lightVars, darkVars 를 로컬 스토리지 에서 들고옴
export const getCustomVarsFromLocalStorage = (): {
    lightVars: Record<string, string>;
    darkVars: Record<string, string>;
} => {
    try {
        const raw = localStorage.getItem(VARS_KEY)
        if (!raw) {
            return { lightVars: {}, darkVars: {} }
        }
        const parsed = JSON.parse(raw)
        return {
            lightVars: parsed.lightVars || {},
            darkVars: parsed.darkVars || {},
        }
    } catch {
        console.warn('Invalid vite-ui-theme-vars format in localStorage')
        return { lightVars: {}, darkVars: {} }
    }
}





export const saveThemeVar = (theme: Theme, key: string, value: string) => {
    const raw = localStorage.getItem(VARS_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    const themeKey = `${theme}Vars`

    const updated = {
        ...parsed,
        [themeKey]: {
            ...(parsed[themeKey] || {}),
            [key]: value,
        },
    }

    localStorage.setItem(VARS_KEY, JSON.stringify(updated))
}



// 변경된 테마를 적용
export const applyThemeVariables = (theme: Theme) => {
    const root = document.documentElement;

    const { lightVars = {}, darkVars = {} } = getCustomVarsFromLocalStorage();
    const vars = theme === 'dark' ? darkVars : lightVars;

    // 적용 전에 기존 변수 제거
    clearThemeVariables();

    // localStorage에 해당 테마 정보가 없으면 CSS 기본값 그대로 유지
    if (!vars || Object.keys(vars).length === 0) {
        console.log(`[Theme] No custom vars found for ${theme}, using CSS default`);
        return;
    }

    // localStorage에 있는 변수만 적용
    Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });
};

// 현재 css 청소
export const clearThemeVariables = () => {
    const root = document.documentElement;
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage();

    const allKeys = new Set([
        ...Object.keys(lightVars || {}),
        ...Object.keys(darkVars || {}),
    ]);

    allKeys.forEach((key) => {
        root.style.removeProperty(key);

        // 강제로 비우기
        root.style.setProperty(key, '');
    });
}


// 로컬에 값이 있으면 그걸로 저장, 없으면 패스, 배경은 만약 없으면 기본값으로 로컬 스토리지에 넣어줌 (새로고침 깜빡임 방지용)
export const setDefaultThemeVars = (theme: Theme) => {
    const raw = localStorage.getItem(VARS_KEY)
    const parsed = raw ? JSON.parse(raw) : {}

    const ensureVars = (theme: Theme, defaults: Record<string, string>) => {
        const key = `${theme}Vars`
        if (!parsed[key] || Object.keys(parsed[key]).length === 0) {
            parsed[key] = defaults
        }

        // --background 보장 (적용 하고 값을 등록해야 하기에 여기 위치)
        if (!parsed[key]['--background']) {
            parsed[key]['--background'] = oklchToHex(
                getComputedStyle(document.documentElement).getPropertyValue('--background'),
            )
        }
    }

    // 선택된 테마에 맞는 변수만 적용
    if (theme === 'light') {
        ensureVars('light', {})
    } else if (theme === 'dark') {
        ensureVars('dark', {})
    }

    localStorage.setItem(VARS_KEY, JSON.stringify(parsed))
}




// 특정 테마를 리셋함
export const handleReset = (theme: Theme)  => {
    const raw = localStorage.getItem(VARS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const themeKey = `${theme}Vars`;

    // 1. 해당 테마 변수 제거
    delete parsed[themeKey];
    localStorage.setItem(VARS_KEY, JSON.stringify(parsed));

    // 2. 적용된 커스텀 변수 제거
    clearThemeVariables();

    // 3. 기본 CSS 변수 사용 (JS 적용은 안 함)
    applyThemeVariables(theme);
};
