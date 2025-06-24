// src/shared/utils/themeUtils.tsx
import { useContext } from 'react'
import { ThemeContext } from 'src/shared/lib/shadcn/components/ThemeContext.tsx'

type Theme = 'dark' | 'light'

const VARS_KEY = 'vite-ui-theme-vars'



// 테마 (다크모드 화이트모드) 확인 해주는거
export const useTheme = () => useContext(ThemeContext)








// -------------------------------------완성 선 --------------------------------------------


// 현재 html 에 적용된 css변수를 들고옴 > 삭제 각
export const getFallbackVars = (): Record<string, string> => {
    const root = document.documentElement;
    const fallbackVars: Record<string, string> = {};
    const style = getComputedStyle(root);

    for (const name of style) {
        if (name.startsWith('--')) {
            fallbackVars[name] = style.getPropertyValue(name).trim();
        }
    }
    console.log(fallbackVars)
    return fallbackVars;
};



// 현재
export const getCssVariable = (theme: Theme, key: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue('--background')
}

export const getBackgroundColors = async (): Promise<{ lightMode: string; darkMode: string }> => {
    const root = document.documentElement;

    // 라이트모드 배경색 (기본적으로 :root에서 정의된 값)
    const lightModeBackground = getComputedStyle(root).getPropertyValue('--background').trim();
    console.log(lightModeBackground)

    // .dark 클래스를 root에 추가한 후 1초 기다리기
    root.classList.add('dark');

    // 1초 기다리기
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 다크모드 배경색 가져오기
    const darkModeBackground = getComputedStyle(root).getPropertyValue('--background').trim();
    console.log(darkModeBackground)
    // .dark 클래스 제거
    root.classList.remove('dark');

    return {
        lightMode: lightModeBackground,
        darkMode: darkModeBackground,
    };
};


// lightVars, darkVars 를 로컬 스토리지 에서 들고옴
export const getCustomVarsFromLocalStorage = (): {
    lightVars: Record<string, string>;
    darkVars: Record<string, string>;
} => {
    try {
        const raw = localStorage.getItem(VARS_KEY);
        const parsed = JSON.parse(raw || '{}') as Record<string, Record<string, string>>;

        // lightVars와 darkVars를 로컬스토리지에서 가져오고 없으면 fallback으로 대체
        return {
            lightVars: parsed.lightVars ?? getFallbackVars(),
            darkVars: parsed.darkVars ?? getFallbackVars(),
        };
    } catch {
        console.warn('Invalid vite-ui-theme-vars format in localStorage');
        const fallbackVars = getFallbackVars();
        return { lightVars: fallbackVars, darkVars: fallbackVars };
    }
};



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

// 로컬에 값이 있으면 그걸로 저장, 없으면 패스, 배경은 만약 없으면 fallback 값으로 사용
export const setDefaultThemeVars = (theme: Theme) => {
    const raw = localStorage.getItem(VARS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};

    const ensureVars = (theme: Theme, defaults: Record<string, string>) => {
        const key = `${theme}Vars`;
        if (!parsed[key] || Object.keys(parsed[key]).length === 0) {
            parsed[key] = defaults;
        }

        // --background 보장
        if (!parsed[key]['--background']) {
            parsed[key]['--background'] = defaults['--background'] ; // 기본값 지정
        }
    };

    // fallback 값 사용
    const lightVars = getFallbackVars();
    console.log(lightVars)
    const darkVars = getFallbackVars();

    ensureVars('light', lightVars);
    ensureVars('dark', darkVars);

    localStorage.setItem(VARS_KEY, JSON.stringify(parsed));
};

export const applyThemeVariables = (theme: Theme) => {
    const root = document.documentElement
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
    const vars = theme === 'dark' ? darkVars : lightVars

    clearThemeVariables()

    // 테마에 해당하는 변수 적용
    Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value)
    })

    if (vars['--background']) {
        root.style.backgroundColor = vars['--background']
    }
}

export const clearThemeVariables = () => {
    const root = document.documentElement
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()

    const allKeys = new Set([
        ...Object.keys(lightVars),
        ...Object.keys(darkVars),
    ])

    allKeys.forEach((key) => {
        root.style.removeProperty(key)
    })
}

export const reapplyThemeVariables = (theme: Theme) => {
    clearThemeVariables()
    applyThemeVariables(theme)
}
