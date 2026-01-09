"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2, ChevronLeft } from "lucide-react";
import axios from "axios";
import DoctorCard, { DoctorAgent } from "./DoctorCard";

const NewSession = () => {
  const [step, setStep] = useState<"details" | "doctors">("details");
  const [note, setNote] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>([]);

  const onGetSuggestedDoctors = async () => {
    if (cooldown || !note.trim()) return;

    setLoading(true);
    setCooldown(true);

    try {
      const result = await axios.post("/api/suggest-doctors", { notes: note });
      console.log(result.data);
      setSuggestedDoctors(Array.isArray(result.data) ? result.data : [result.data]);
      setStep("doctors");
    } catch (error: any) {
      if (error.response?.status === 429) {
        alert("Too many requests! Please wait a few seconds and try again.");
      } else {
        console.error(error);
        alert(error.response?.data?.error || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setCooldown(false), 5000);
    }
  };

  const onStartConsultation = () => {
    if (!selectedDoctor) {
      alert("Please select a doctor first.");
      return;
    }
    console.log("Starting consultation with:", selectedDoctor);
    alert(`Consultation started with Dr. ${selectedDoctor.specialist}`);
    // TODO: Navigate to consultation page or start consultation logic
  };

  const handleReset = () => {
    setStep("details");
    setNote("");
    setSuggestedDoctors([]);
    setSelectedDoctor(null);
  };

  return (
    <Dialog onOpenChange={(open) => !open && handleReset()}>
      <DialogTrigger asChild>
        <Button className="mt-4 px-6 py-2 text-base">
          + Start Consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === "details" ? "Enter Your Symptoms" : "Select a Doctor"}
          </DialogTitle>
          <DialogDescription>
            {step === "details"
              ? "Describe your symptoms and medical concerns"
              : "Choose a suitable doctor for your consultation"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Enter Details */}
        {step === "details" && (
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Symptoms & Medical Details
              </label>
              <Textarea
                placeholder="e.g., I have a fever, cough, and mild body aches for the past 2 days..."
                className="h-50 resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={loading}
              />
            </div>
            <p className="text-xs text-gray-500">
              Provide detailed information about your symptoms for accurate doctor recommendations.
            </p>
          </div>
        )}

        {/* Step 2: Select Doctor */}
        {step === "doctors" && suggestedDoctors.length > 0 && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-100 overflow-y-auto">
              {suggestedDoctors.map((doctor, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`cursor-pointer border rounded-lg p-4 transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <DoctorCard doctorAgent={doctor} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: No Doctors Found */}
        {step === "doctors" && suggestedDoctors.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">No doctors available at the moment.</p>
            <p className="text-sm text-gray-400 mt-2">Please try again later.</p>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          {step === "doctors" && (
            <Button
              variant="outline"
              onClick={() => setStep("details")}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          {step === "details" && (
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          )}

          {step === "details" ? (
            <Button
              disabled={!note.trim() || loading || cooldown}
              onClick={onGetSuggestedDoctors}
              className="gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Analyzing..." : "Find Doctors"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              disabled={!selectedDoctor}
              onClick={onStartConsultation}
              className="gap-2"
            >
              Start Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSession;
