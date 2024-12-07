import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FC } from "react";

interface EventsSectionsProps {}

const EventsSections: FC<EventsSectionsProps> = ({}) => {
  return (
    <section
      className="container flex flex-1 flex-col-reverse md:flex-row-reverse justify-center gap-8"
      id="despre"
    >
      <div className="flex flex-col justify-center gap-10  ">
        <p className="text-4xl md:text-5xl font-bold text-center">
          <span className="md:block inline">Evenimente Conexe</span>
        </p>

        {/* 3 cards with middle one a little higher than the others */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl font-bold">
                FII Practic Conference
              </CardTitle>

              <CardDescription>2 Martie 2024</CardDescription>
            </CardHeader>
            <CardContent>
              Evenimentul ce marchează începutul fiecărei ediții, aduce la un
              loc tineri pasionați de domeniul IT și specialiști din diverse
              arii, dornici să își împărtășească experiența.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl font-bold">
                FII Practic Challenge
              </CardTitle>

              <CardDescription>TBD</CardDescription>
            </CardHeader>
            <CardContent>
              După cinci săptămâni în care ai acumulat cunoștinte, ai ocazia să
              le testezi în cadrul acestui hackathon unde, conform unei teme
              alese, vei realiza o aplicație împreună cu colegii tăi de echipă.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl font-bold">
                FII Practic Party
              </CardTitle>

              <CardDescription>TBD</CardDescription>
            </CardHeader>
            <CardContent>
              Petrecerea urmărește să aducă împreună persoanele implicate,
              într-un mediu non-formal, în care acestea se pot cunoaște mai
              bine, dincolo de aspectele teoretice prezentate.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventsSections;
