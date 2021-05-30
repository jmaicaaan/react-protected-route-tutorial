import { RouteProps } from 'react-router-dom';

export type GuardFunctionArgs = RouteProps;

export type GuardFunction = (args: GuardFunctionArgs) => boolean;
