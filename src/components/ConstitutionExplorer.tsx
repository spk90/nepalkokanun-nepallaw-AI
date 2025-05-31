
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, BookOpen, ChevronDown, ChevronRight, FileText, Eye, Download } from "lucide-react";

interface Article {
  number: number;
  title: string;
  content: string;
  part: string;
  chapter: string;
}

const ConstitutionExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [expandedParts, setExpandedParts] = useState<string[]>(['Part 3']);

  // Sample constitution structure
  const constitutionStructure = {
    "Part 1: Preliminary": {
      "Chapter 1: Introduction": [
        { number: 1, title: "Constitution as fundamental law", content: "This Constitution is the fundamental law of Nepal. Any law inconsistent with this Constitution shall, to the extent of such inconsistency, be void." },
        { number: 2, title: "Sovereignty and State power", content: "The sovereignty and State power of Nepal shall be vested in the Nepali people. Such power shall be exercised in accordance with the provisions of this Constitution." },
        { number: 3, title: "Characteristics of the State", content: "Nepal is an independent, indivisible, sovereign, secular, inclusive, democratic, socialism-oriented, federal democratic republican state." }
      ]
    },
    "Part 2: Citizenship": {
      "Chapter 2: Citizenship": [
        { number: 10, title: "Citizenship of Nepal", content: "A person having citizenship of Nepal in accordance with law shall be a citizen of Nepal." },
        { number: 11, title: "Acquisition of citizenship", content: "The citizenship of Nepal shall be acquired by descent or birth or naturalization." }
      ]
    },
    "Part 3: Fundamental Rights": {
      "Chapter 3: Fundamental Rights": [
        { number: 16, title: "Right to life", content: "Every person shall have the right to live with dignity." },
        { number: 17, title: "Right to freedom", content: "No person shall be deprived of his or her personal liberty except in accordance with law." },
        { number: 18, title: "Right to equality", content: "All citizens shall be equal before law. No person shall be denied the equal protection of laws." },
        { number: 19, title: "Right to communication", content: "Every citizen shall have the right to be informed about matters of public importance." },
        { number: 20, title: "Right to justice", content: "Every citizen shall have the right to justice." }
      ]
    },
    "Part 4: Directive Principles": {
      "Chapter 4: Directive Principles, Policies and Obligations of the State": [
        { number: 50, title: "Directive principles", content: "The State shall pursue a policy of making the society based on social justice and equality." },
        { number: 51, title: "Policies of the State", content: "The State shall formulate and implement policies for the protection and promotion of fundamental rights." }
      ]
    }
  };

  const togglePartExpansion = (part: string) => {
    setExpandedParts(prev => 
      prev.includes(part) 
        ? prev.filter(p => p !== part)
        : [...prev, part]
    );
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };

  const allArticles = Object.entries(constitutionStructure).flatMap(([part, chapters]) =>
    Object.entries(chapters).flatMap(([chapter, articles]) =>
      articles.map(article => ({ ...article, part, chapter }))
    )
  );

  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.number.toString().includes(searchTerm)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Navigation Panel */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Constitution Navigator</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Constitution Structure */}
            <ScrollArea className="h-[500px]">
              {searchTerm ? (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 mb-2">
                    Search Results ({filteredArticles.length})
                  </h3>
                  {filteredArticles.map((article) => (
                    <Button
                      key={article.number}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleArticleSelect(article)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            Art. {article.number}
                          </Badge>
                          <span className="font-medium text-sm">{article.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {article.content.substring(0, 100)}...
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(constitutionStructure).map(([part, chapters]) => (
                    <Collapsible
                      key={part}
                      open={expandedParts.includes(part)}
                      onOpenChange={() => togglePartExpansion(part)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between font-semibold text-left p-3"
                        >
                          <span className="text-sm">{part}</span>
                          {expandedParts.includes(part) ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-4 space-y-1">
                        {Object.entries(chapters).map(([chapter, articles]) => (
                          <div key={chapter} className="space-y-1">
                            <div className="font-medium text-xs text-gray-600 px-3 py-1">
                              {chapter}
                            </div>
                            {articles.map((article) => (
                              <Button
                                key={article.number}
                                variant="ghost"
                                className="w-full justify-start text-left h-auto p-2 ml-2"
                                onClick={() => handleArticleSelect({ ...article, part, chapter })}
                              >
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {article.number}
                                  </Badge>
                                  <span className="text-sm">{article.title}</span>
                                </div>
                              </Button>
                            ))}
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Article Display Panel */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>
                  {selectedArticle 
                    ? `Article ${selectedArticle.number}: ${selectedArticle.title}`
                    : "Select an article to view"
                  }
                </span>
              </CardTitle>
              {selectedArticle && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Summarize
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedArticle ? (
              <div className="space-y-6">
                {/* Article Metadata */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedArticle.part}</Badge>
                  <Badge variant="outline">{selectedArticle.chapter}</Badge>
                  <Badge className="bg-gradient-to-r from-red-600 to-green-600">
                    Article {selectedArticle.number}
                  </Badge>
                </div>

                {/* Article Content */}
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedArticle.title}
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {selectedArticle.content}
                    </p>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Related Articles</h3>
                  <div className="flex flex-wrap gap-2">
                    {allArticles
                      .filter(a => a.part === selectedArticle.part && a.number !== selectedArticle.number)
                      .slice(0, 4)
                      .map(article => (
                        <Button
                          key={article.number}
                          variant="outline"
                          size="sm"
                          onClick={() => handleArticleSelect(article)}
                          className="text-xs"
                        >
                          Art. {article.number}: {article.title}
                        </Button>
                      ))
                    }
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Ask AI about this article
                    </Button>
                    <Button variant="outline" size="sm">
                      Find court cases
                    </Button>
                    <Button variant="outline" size="sm">
                      Compare with other articles
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Constitution of Nepal 2072
                </h3>
                <p className="text-gray-500 mb-6">
                  Select an article from the left panel to view its full content and legal provisions.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">35</div>
                    <div className="text-xs text-gray-600">Parts</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">308</div>
                    <div className="text-xs text-gray-600">Articles</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">9</div>
                    <div className="text-xs text-gray-600">Schedules</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">31</div>
                    <div className="text-xs text-gray-600">Rights</div>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConstitutionExplorer;
