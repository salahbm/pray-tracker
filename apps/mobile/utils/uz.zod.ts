import { z } from 'zod/v4';

/** Detects JS type for human-friendly output */
export const parsedType = (data: any): string => {
  const t = typeof data;

  switch (t) {
    case 'string':
      return 'matn';
    case 'number':
      return Number.isNaN(data) ? 'NaN' : 'son';
    case 'boolean':
      return 'mantiqiy qiymat';
    case 'bigint':
      return 'katta son';
    case 'symbol':
      return 'simvol';
    case 'undefined':
      return 'aniqlanmagan';
    case 'function':
      return 'funksiya';
    case 'object':
      if (Array.isArray(data)) return 'massiv';
      if (data === null) return 'null';
      if (data instanceof Date) return 'sana';
      if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
        return data.constructor.name;
      }
      return 'obyekt';
  }
  return t;
};

/** Uzbek Zod locale implementation */
export const uzLocale = (): z.ZodErrorMap => {
  const Sizable: Record<string, { unit: string; verb: string }> = {
    string: { unit: 'belgilar', verb: 'bo‘lishi kerak' },
    file: { unit: 'bayt', verb: 'bo‘lishi kerak' },
    array: { unit: 'elementlar', verb: 'bo‘lishi kerak' },
    set: { unit: 'elementlar', verb: 'bo‘lishi kerak' },
  };

  const Nouns: Record<string, string> = {
    email: 'elektron pochta manzili',
    url: 'URL',
    uuid: 'UUID',
    cuid: 'cuid',
    cuid2: 'cuid2',
    uuidv4: 'UUIDv4',
    emoji: 'emoji',
    datetime: 'sana va vaqt',
    date: 'sana',
    time: 'vaqt',
    ipv4: 'IPv4 manzil',
    ipv6: 'IPv6 manzil',
    base64: 'base64 satri',
    jwt: 'JWT token',
  };

  const getSizing = (origin: string): { unit: string; verb: string } | null =>
    Sizable[origin] ?? null;

  return issue => {
    switch (issue.code) {
      case 'invalid_type':
        return {
          message: `Noto‘g‘ri turdagi qiymat: ${issue.expected} kutilgan, ammo ${parsedType(issue.input)} olindi`,
        };

      case 'invalid_value':
        if (issue.values.length === 1)
          return {
            message: `Noto‘g‘ri qiymat: ${z.util.stringifyPrimitive(issue.values[0])} kutilgan`,
          };
        return {
          message: `Noto‘g‘ri qiymat: quyidagilardan biri kutilgan ${z.util.joinValues(issue.values, ', ')}`,
        };

      case 'too_big': {
        const adj = issue.inclusive ? '<=' : '<';
        const sizing = getSizing(issue.origin);
        if (sizing)
          return {
            message: `Qiymat juda katta: ${issue.origin} ${adj}${issue.maximum} ${sizing.unit} ${sizing.verb}`,
          };
        return { message: `Qiymat juda katta: ${adj}${issue.maximum}` };
      }

      case 'too_small': {
        const adj = issue.inclusive ? '>=' : '>';
        const sizing = getSizing(issue.origin);
        if (sizing)
          return {
            message: `Qiymat juda kichik: ${issue.origin} ${adj}${issue.minimum} ${sizing.unit} ${sizing.verb}`,
          };
        return { message: `Qiymat juda kichik: ${adj}${issue.minimum}` };
      }

      case 'invalid_format': {
        const _issue = issue as any;
        if (_issue.format === 'starts_with')
          return { message: `Matn "${_issue.prefix}" bilan boshlanishi kerak` };
        if (_issue.format === 'ends_with')
          return { message: `Matn "${_issue.suffix}" bilan tugashi kerak` };
        if (_issue.format === 'includes')
          return { message: `Matn "${_issue.includes}" ni o‘z ichiga olishi kerak` };
        if (_issue.format === 'regex')
          return { message: `Matn mos kelishi kerak: ${_issue.pattern}` };

        return { message: `Yaroqsiz ${Nouns[_issue.format] ?? issue.format}` };
      }

      case 'not_multiple_of':
        return { message: `Son ${issue.divisor} ga ko‘paytmasi bo‘lishi kerak` };

      case 'unrecognized_keys':
        return {
          message: `Noma'lum kalit${issue.keys.length > 1 ? 'lar' : ''}: ${z.util.joinValues(issue.keys, ', ')}`,
        };

      case 'invalid_key':
        return { message: `Noto‘g‘ri kalit ${issue.origin} ichida` };

      case 'invalid_union':
        return { message: `Noto‘g‘ri qiymat` };

      case 'invalid_element':
        return { message: `Noto‘g‘ri element ${issue.origin} ichida` };

      default:
        return { message: `Noto‘g‘ri qiymat` };
    }
  };
};
