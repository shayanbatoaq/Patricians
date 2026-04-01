import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  CircleCheckBig,
  Clock3,
  Globe,
  Layers3,
  Megaphone,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WandSparkles,
  Waypoints,
  Workflow,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  arrow: ArrowUpRight,
  badge: BadgeCheck,
  brain: BrainCircuit,
  briefcase: BriefcaseBusiness,
  chart: ChartColumnIncreasing,
  check: CircleCheckBig,
  clock: Clock3,
  globe: Globe,
  layers: Layers3,
  megaphone: Megaphone,
  message: MessageSquareText,
  rocket: Rocket,
  screen: Layers3,
  shield: ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  users: Waypoints,
  wand: WandSparkles,
  waypoints: Waypoints,
  workflow: Workflow,
};

export function getSiteIcon(icon: string) {
  return iconMap[icon] ?? Sparkles;
}
