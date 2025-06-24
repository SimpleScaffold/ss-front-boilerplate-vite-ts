// src/shared/utils/themeUtils.tsx
import { useContext } from 'react'
import { ThemeContext } from 'src/shared/lib/shadcn/components/ThemeContext.tsx'
import { oklchToHex } from 'src/shared/utils/color.tsx'

type Theme = 'dark' | 'light'

const VARS_KEY = 'vite-ui-theme-vars'



// 테마 (다크모드 화이트모드) 확인 해주는거
export const useTheme = () => useContext(ThemeContext)


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




// lightVars, darkVars 를 로컬 스토리지 에서 들고옴
export const getCustomVarsFromLocalStorage = (): {
    lightVars: Record<string, string>;
    darkVars: Record<string, string>;
} => {
    try {
        const raw = localStorage.getItem(VARS_KEY);
        if (!raw) {
            return { lightVars: {}, darkVars: {} };
        }
        const parsed = JSON.parse(raw);
        return {
            lightVars: parsed.lightVars|| {} ,
            darkVars: parsed.darkVars || {},
        };
    } catch {
        console.warn('Invalid vite-ui-theme-vars format in localStorage');
        return { lightVars: {}, darkVars: {} };
    }
};




// 변경된 테마를 적용
export const applyThemeVariables = (theme: Theme) => {
    const root = document.documentElement

    const { lightVars = {}, darkVars = {} } = getCustomVarsFromLocalStorage();


    const vars = theme === 'dark' ? darkVars : lightVars


    // 적용전에 기존꺼 삭제 (값 없어서 전에 값 남아 있는거 방지 )
    clearThemeVariables()




    // 테마에 해당하는 변수 적용
    Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value)
    })

    // 이건 index.html 에서만 접근 가능해서 추가 필요
    if (vars['--background']) {
        root.style.backgroundColor = vars['--background']
    }


}

// 현재 css 청소
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
                getComputedStyle(document.documentElement).getPropertyValue('--background')
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





