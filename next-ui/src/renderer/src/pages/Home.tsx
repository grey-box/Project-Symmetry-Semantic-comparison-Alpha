import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {BookOpenText} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {useState} from "react";
import {Phase} from "@/models/Phase.ts";
import {cn} from "@/lib/utils.ts";
import TranslationSection from "@/components/TranslationSection.tsx";

const Home = () => {
	const [phase, setPhase] = useState(Phase.TRANSLATION);

	return (
		<section className="min-h-screen">
			<div className="flex justify-between">
				<div>
					<h1 className="text-3xl">
						Hi there, Alamin
					</h1>
					<p className="text-sm">
						Here will be the content regarding the basic use of app.
					</p>
				</div>
				<div className="flex items-center gap-x-2">
					<Select>
						<SelectTrigger className="w-[180px] border-slate-300">
							<SelectValue placeholder="Select a language"/>
						</SelectTrigger>
						<SelectContent className="text-black">
							<SelectItem value="english">English</SelectItem>
							<SelectItem value="french">French</SelectItem>
							<SelectItem value="arabic">Arabic</SelectItem>
						</SelectContent>
					</Select>
					<div
						className="rounded-full size-11 flex items-center justify-center bg-white border-slate-200 border">
						<BookOpenText/>
					</div>
				</div>

			</div>

			<div className="mt-6 px-7 flex gap-x-3 items-center">
				<div className="flex gap-x-3">
					<span className={cn("text-white flex items-center justify-center size-[22px] rounded-full", {
						"bg-black": phase === Phase.TRANSLATION,
						"bg-slate-400": phase !== Phase.TRANSLATION
					})}>
						1
					</span>
					<div className={cn({
						"text-black": phase === Phase.TRANSLATION,
						"text-slate-400": phase !== Phase.TRANSLATION
					})}>Translation
					</div>
				</div>
				<Separator className="bg-slate-300 shrink h-px"/>
				<div className="flex gap-x-3 shrink-0">
					<span className={cn("text-white flex items-center justify-center size-[22px] rounded-full", {
						"bg-black": phase === Phase.AI_COMPARISON,
						"bg-slate-400": phase !== Phase.AI_COMPARISON
					})}>
						2
					</span>
					<div className={cn({
						"text-black": phase === Phase.AI_COMPARISON,
						"text-slate-400": phase !== Phase.AI_COMPARISON
					})}>AI Comparison
					</div>
				</div>
			</div>

			{
				phase === Phase.TRANSLATION ?
					<TranslationSection/>
					:
					<div>Comparison Section</div>
			}
		</section>
	);
};

export default Home;
