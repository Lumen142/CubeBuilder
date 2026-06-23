import { select, text } from '@clack/prompts';

type OptionType = {
    value: string,
    label: string,
    hint?: string,
    disabled?: boolean
}

export async function the_select_function(message: string, options: OptionType[]) {
    const projectType = await select({
        message: message,
        options: options
    });

    return projectType
}

export async function the_text_function(message: string, placeholder: string, initialValue: string) {
    const projectType = await text({
        message: message,
        placeholder: placeholder,
        initialValue: initialValue
    });

    return projectType
}
