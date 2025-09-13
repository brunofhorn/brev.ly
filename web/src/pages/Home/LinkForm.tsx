import Button from "@/components/button";
import { Input } from "@/components/input";
import { FieldLabel } from "@/components/label";
import { PrefixInput } from "@/components/prefix-input";
import { useLinksContext } from "@/contexts/links-context";
import { useLoadingsContext } from "@/contexts/loadings-context";
import { normalizeHttpUrl } from "@/helpers/normalizeHttpUrl";
import { linksCreateFormSchema, type LinksFormCreateValues } from "@/schemas/links-create-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function LinkForm() {
    const { handleLoadings } = useLoadingsContext()
    const { createLink } = useLinksContext()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid, isSubmitting },
    } = useForm<LinksFormCreateValues>({
        resolver: zodResolver(linksCreateFormSchema),
        defaultValues: { originalUrl: "", shortUrl: "" },
    });

    const onSubmit = async (values: LinksFormCreateValues) => {
        try {
            handleLoadings({
                key: 'registerLink',
                value: true
            })

            await createLink(values)
            reset()
        } catch (error) {
            console.error("[LINKS][CREATE]", error)
        } finally {
            handleLoadings({
                key: 'registerLink',
                value: false
            })
        }
    };

    return (
        <form className="flex flex-col p-8 gap-6 bg-gray-100 w-full lg:w-2/5 rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <>
                <p className="text-style-lg text-gray-600">Novo link</p>
                <div className='flex flex-col gap-4'>
                    <div className='group/field'>
                        <FieldLabel htmlFor="originalUrl" invalid={!!errors.originalUrl}>
                            Link original
                        </FieldLabel>
                        <Input
                            id="originalUrl"
                            placeholder="www.exemplo.com.br"
                            {...register("originalUrl", {
                                onBlur: (e) => {
                                    const v = normalizeHttpUrl(e.target.value);
                                    setValue("originalUrl", v, { shouldValidate: true, shouldDirty: true });
                                },
                            })}
                            onPaste={(e) => {
                                const text = e.clipboardData.getData("text");
                                const v = normalizeHttpUrl(text);
                                e.preventDefault(); // impede o colar padrão
                                setValue("originalUrl", v, { shouldValidate: true, shouldDirty: true });
                            }}
                            error={!!errors.originalUrl}
                        />
                        {errors.originalUrl && (
                            <p className="mt-1 text-xs text-danger">{errors.originalUrl.message}</p>
                        )}
                    </div>
                    <div className="group/field mt-4">
                        <FieldLabel htmlFor="shortUrl" invalid={!!errors.shortUrl}>
                            Link encurtado
                        </FieldLabel>
                        <div className="flex gap-3">
                            <PrefixInput
                                prefix='brev.ly/'
                                id="shortUrl"
                                placeholder="seu-link-aqui"
                                className="flex-1"
                                {...register("shortUrl")}
                                error={!!errors.shortUrl}
                            />
                        </div>
                        {errors.shortUrl && (
                            <p className="mt-1 text-xs text-danger">{errors.shortUrl.message}</p>
                        )}
                    </div>
                </div>

                <Button type="submit" full disabled={!isValid || isSubmitting}>
                    {isSubmitting ? "Salvando..." : "Salvar link"}
                </Button>
            </>
        </form>
    )
}