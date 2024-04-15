import {useCallback} from 'react';
import {ChevronRight, Info} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {TranslationFormType} from "@/models/TranslationFormType.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {TranslationTool} from "@/models/enums/TranslationTool.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const TRANSLATION_LANGUAGES = [
	{value: "english", label: "English"},
	{value: "french", label: "French"},
	{value: "hindi", label: "Hindi"},
	{value: "arabic", label: "Arabic"},

]

const TranslationSection = () => {
	const form = useForm<TranslationFormType>({
		defaultValues: {
			apiKey: "",
			translationTool: TranslationTool.GOOGLE,
			sourceArticleUrl: "",
			targetArticleLanguage: "English",
			sourceArticleContent: "",
			translatedArticleContent: ""
		}
	});
	const {
		register,
		handleSubmit,
		formState: {errors},
		watch,
	} = form;

	const onSubmit = useCallback((data: TranslationFormType) => {
		console.log(data);
	}, []);

	return (
		<section className="bg-white mt-6 p-2 rounded-xl shadow-md h-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>

					<div className="flex items-center justify-between">
						<div className="inline-flex items-center gap-x-2">
							<Info size={16}/>
							<span className="text-zinc-700 text-xs">
								Here will be instruction regarding translation.
							</span>
						</div>
						<div className="flex gap-x-2">
							<Button variant="outline">Clear</Button>
							<Button variant="default">Translate</Button>
							<Button disabled className="flex gap-x-2">Compare <ChevronRight size={16}/></Button>
						</div>
					</div>

					<div className="flex justify-between py-2 px-5 mt-2">
						<FormField
							control={form.control}
							name="translationTool"
							render={({field}) => (
								<FormItem className="w-2/5 flex items-center gap-x-4">
									<FormLabel className="shrink-0">Translation Tool</FormLabel>
									<FormControl>
										<Select {...field}>
											<SelectTrigger className="!mt-0">
												<SelectValue placeholder="Language"/>
											</SelectTrigger>
											<SelectContent>
												{
													TRANSLATION_LANGUAGES.map(languageInfo => (
														<SelectItem value={languageInfo.value}>
															{languageInfo.label}
														</SelectItem>
													))
												}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>


						<FormField
							control={form.control}
							name="apiKey"
							render={({field}) => (
								<FormItem className="w-2/5 flex items-center gap-x-4">
									<FormLabel className="shrink-0">API Key</FormLabel>
									<FormControl>
										<Input placeholder="API Key" className="!mt-0" {...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-between py-2 px-5 mt-2">
						<FormField
							control={form.control}
							name="sourceArticleUrl"
							render={({field}) => (
								<FormItem className="w-2/5 flex items-center gap-x-4">
									<FormLabel className="shrink-0">Source Article URL</FormLabel>
									<FormControl>
										<Input placeholder="Enter a URL" className="!mt-0" {...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="targetArticleLanguage"
							render={({field}) => (
								<FormItem className="w-2/5 flex items-center gap-x-4">
									<FormLabel className="shrink-0">Target Article Language</FormLabel>
									<FormControl>
										<Select {...field}>
											<SelectTrigger className="!mt-0">
												<SelectValue placeholder="Language"/>
											</SelectTrigger>
											<SelectContent>
												{
													TRANSLATION_LANGUAGES.map(languageInfo => (
														<SelectItem value={languageInfo.value}>
															{languageInfo.label}
														</SelectItem>
													))
												}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-stretch py-2 border h-full">
						<FormField
							control={form.control}
							name="sourceArticleContent"
							render={({field}) => (
								<FormItem className="w-1/2 flex items-center gap-x-4 px-2">
									<FormLabel className="shrink-0 sr-only">Content</FormLabel>
									<FormControl>
										<Textarea className="border-0" placeholder="Source article" {...field} rows={22} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>

						<Separator orientation="vertical" className="border-slate-400 h-full"/>

						<FormField
							control={form.control}
							name="translatedArticleContent"
							render={({field}) => (
								<FormItem className="w-1/2 flex items-center gap-x-4 px-2">
									<FormLabel className="shrink-0 sr-only">Content</FormLabel>
									<FormControl>
										<Textarea className="border-0" placeholder="Translated article" {...field} rows={22} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
			<div>

			</div>
		</section>
	);
};

export default TranslationSection;
