import { FormInput } from './types';

export function knownObject(
  type?: string,
  uiSchema?: { [key: string]: any },
  formInputs?: { [key: string]: FormInput },
): boolean {
  if (!type || type !== 'object') return false;
  if (!uiSchema) return false;
  if (!formInputs) return false;

  return Object.values(formInputs).some((formInput) => {
    if (formInput.type !== 'object') {
      return false;
    }
    const matchRule = formInput.matchIf.some((matchRule) => {
      if (
        !!matchRule.field &&
        !!uiSchema['ui:field'] &&
        matchRule.field === uiSchema['ui:field']
      )
        return true;
      if (
        !!matchRule.widget &&
        !!uiSchema['ui:widget'] &&
        matchRule.widget === uiSchema['ui:widget']
      )
        return true;
      return false;
    });
    return matchRule;
  });
}
