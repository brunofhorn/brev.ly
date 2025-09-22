import Button from "@/components/button";
import { Input } from "@/components/input";
import { InputError } from "@/components/input-error";
import { FieldLabel } from "@/components/label";
import { PrefixInput } from "@/components/prefix-input";
import { useLinksContext } from "@/contexts/links-context";
import { useLoadingsContext } from "@/contexts/loadings-context";
import { normalizeHttpUrl } from "@/helpers/normalizeHttpUrl";
import { linksCreateFormSchema, type LinksFormCreateValues } from "@/schemas/links-create-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
        mode: "onChange",
        defaultValues: { originalUrl: "", shortUrl: "" },
    });

    const onSubmit = async (values: LinksFormCreateValues) => {
        try {
            handleLoadings({ key: "registerLink", value: true });

            await createLink(values);

            reset();

            toast.success("Link criado!", {
                description: "O link foi salvo com sucesso.",
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Não foi possível salvar o link. Tente novamente.";
            toast.error("Erro ao criar link", { description: message });

            console.error("[LINKS][CREATE]", error);
        } finally {
            handleLoadings({ key: "registerLink", value: false });
        }
    };

    console.log(errors, isValid)

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
                                e.preventDefault();
                                setValue("originalUrl", v, { shouldValidate: true, shouldDirty: true });
                            }}
                            error={!!errors.originalUrl}
                        />
                        {errors.originalUrl && errors.originalUrl.message && (
                            <InputError message={errors.originalUrl.message} />
                        )}
                    </div>
                    <div className="group/field mt-4">
                        <FieldLabel htmlFor="shortUrl" invalid={!!errors.shortUrl}>
                            Link encurtado
                        </FieldLabel>
                        <div className="flex gap-3">
                            <PrefixInput
                                prefix='brevly-ftr.vercel.app/'
                                id="shortUrl"
                                placeholder="seu-link-aqui"
                                className="flex-1"
                                {...register("shortUrl")}
                                error={!!errors.shortUrl}
                            />
                        </div>
                        {errors.shortUrl && errors.shortUrl.message && (
                            <InputError message={errors.shortUrl.message} />
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