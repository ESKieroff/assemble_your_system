"use client";

import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/Badge";

type StackInfo = {
  name: string;
  description: string;
  highlights: string[];
  score: number;
};

export default function StackCard({ stack }: { stack: StackInfo }) {
  return (
    <Card className="w-full max-w-md shadow-md hover:shadow-xl transition rounded-2xl border border-muted">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{stack.name}</h3>
          <span className="text-sm text-muted-foreground">Score: {stack.score}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{stack.description}</p>
        <div className="flex flex-wrap gap-2">
          {stack.highlights.map((item, index) => (
            <Badge key={index} variant="default" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
