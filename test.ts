import { test, assert, assertEqual } from "https://deno.land/x/testing/mod.ts";
import { createAlea } from "./mod.ts";

const seed: string | any[] = "seed";
const expected: number[] = [
  0.6761468204203993,
  0.4017317947000265,
  0.683190138079226,
  0.05949996248818934,
  0.8896638506557792
];

test(function matchesTestVector(): void {
  const alea: Function = createAlea(seed);
  for (let i: number = 0; i < 5; i++) assertEqual(alea(), expected[i]);
});

test(function matchingSequences(): void {
  const alea1: Function = createAlea(seed);
  const alea2: Function = createAlea(seed);
  for (let i: number = 0; i < 1000; i++) assertEqual(alea1(), alea2());
});
