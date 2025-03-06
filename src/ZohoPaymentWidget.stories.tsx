import type { Meta, StoryFn } from "@storybook/react";
import { ZohoPaymentWidget } from "./ZohoPaymentWidget";

export default {
	title: "ReactComponentLibrary/Rating",
	component: ZohoPaymentWidget,
} as Meta<typeof ZohoPaymentWidget>;

const Template: StoryFn<typeof ZohoPaymentWidget> = (args) => (
	<ZohoPaymentWidget {...args} />
);
