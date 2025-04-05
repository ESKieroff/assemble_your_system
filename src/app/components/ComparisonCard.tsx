"use client";

import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/Badge";

type StackComparison = {
  name: string;
  score: number;
  highlights: string[];
  estimatedTime: string;
  estimatedCost: string;
};

export default function ComparisonCard({ stack }: { stack: StackComparison }) {
  return (
    <Card className="w-full max-w-md shadow-md hover:shadow-xl transition rounded-2xl border border-muted">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{stack.name}</h3>
          <span className="text-sm text-muted-foreground">Score: {stack.score}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          <p>Tempo estimado: <strong>{stack.estimatedTime}</strong></p>
          <p>Custo estimado: <strong>{stack.estimatedCost}</strong></p>
        </div>
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
