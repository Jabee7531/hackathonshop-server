import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function NotIn(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return (
        object: Object,
        propertyName: string,
    ) => {
        registerDecorator({
            name: 'NotIn',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(
                    value: any,
                    args: ValidationArguments,
                ) {
                    const [relatedPropertyName] =
                        args.constraints;
                    const relatedValue = (
                        args.object as any
                    )[relatedPropertyName];
                    return (
                        typeof value ===
                            'string' &&
                        typeof relatedValue ===
                            'string' &&
                        !relatedValue.includes(
                            value,
                        )
                    );
                },
            },
        });
    };
}

export function Reg(
    validationOptions?: ValidationOptions,
) {
    return (
        object: Object,
        propertyName: string,
    ) => {
        registerDecorator({
            name: 'Reg',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return (
                        typeof value ===
                            'string' &&
                        !/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]$/.test(
                            value,
                        )
                    );
                },
            },
        });
    };
}
