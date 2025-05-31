
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, Scale, Users, Mic, Send, Search, FileText, Gavel } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import ConstitutionExplorer from "@/components/ConstitutionExplorer";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-red-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-green-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nepal Law AI</h1>
                <p className="text-sm text-gray-600">नेपाली कानून सहायक</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-green-200 text-green-700">
                Constitution 2072
              </Badge>
              <Button variant="outline" size="sm">
                नेपाली
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ask Legal Questions, Get Expert Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your AI-powered assistant for understanding Nepali Constitution and legal provisions. 
            Get accurate answers with proper citations in simple language.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-red-100">
            <CardContent className="pt-6">
              <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">308</div>
              <p className="text-sm text-gray-600">Constitution Articles</p>
            </CardContent>
          </Card>
          <Card className="text-center border-green-100">
            <CardContent className="pt-6">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <p className="text-sm text-gray-600">AI Assistance</p>
            </CardContent>
          </Card>
          <Card className="text-center border-blue-100">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2+</div>
              <p className="text-sm text-gray-600">Languages</p>
            </CardContent>
          </Card>
          <Card className="text-center border-purple-100">
            <CardContent className="pt-6">
              <Gavel className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <p className="text-sm text-gray-600">Accurate Citations</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Interface */}
      <section className="container mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Ask Questions</span>
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Explore Constitution</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="explore" className="space-y-4">
            <ConstitutionExplorer />
          </TabsContent>
        </Tabs>
      </section>

      {/* Legal Disclaimer */}
      <LegalDisclaimer />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Nepal Law AI</h3>
              <p className="text-gray-400">
                Making Nepali legal information accessible to everyone through AI technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Constitution 2072</a></li>
                <li><a href="#" className="hover:text-white">Legal Acts</a></li>
                <li><a href="#" className="hover:text-white">Court Decisions</a></li>
                <li><a href="#" className="hover:text-white">Legal Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                For technical support or legal queries, contact our team.
              </p>
            </div>
          </div>
          <Separator className="my-6 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Nepal Law AI. Built for the people of Nepal. 🇳🇵</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
