import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as useGenerateTitlesModule from '../model/use-generate-titles';
import { AiTitleGenerator } from './ai-title-generator';

// Створюємо моки для хука
const mockHandleGenerate = vi.fn();
const mockClearSuggestions = vi.fn();

const mockUseGenerateTitles = vi.spyOn(useGenerateTitlesModule, 'useGenerateTitles');

describe('AiTitleGenerator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial state (Generate button, no suggestions)', () => {
    mockUseGenerateTitles.mockReturnValue({
      isGenerating: false,
      suggestions: [],
      handleGenerate: mockHandleGenerate,
      clearSuggestions: mockClearSuggestions,
    });

    render(<AiTitleGenerator getPostContent={() => 'Test content'} onSelectTitle={vi.fn()} />);

    expect(screen.getByText('AI Title Generator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate/i })).toBeInTheDocument();
    expect(screen.queryByText('Select a title to apply:')).not.toBeInTheDocument();
  });

  it('calls handleGenerate from getPostContent when the button is clicked', () => {
    mockUseGenerateTitles.mockReturnValue({
      isGenerating: false,
      suggestions: [],
      handleGenerate: mockHandleGenerate,
      clearSuggestions: mockClearSuggestions,
    });

    const bodyContent = 'Some long post content...';
    // ПЕРЕДАЄМО ФУНКЦІЮ ЗАМІСТЬ РЯДКА
    render(<AiTitleGenerator getPostContent={() => bodyContent} onSelectTitle={vi.fn()} />);

    const button = screen.getByRole('button', { name: /Generate/i });
    fireEvent.click(button);

    expect(mockHandleGenerate).toHaveBeenCalledWith(bodyContent);
    expect(mockHandleGenerate).toHaveBeenCalledTimes(1);
  });

  it('disable the button during generation (isGenerating = true)', () => {
    mockUseGenerateTitles.mockReturnValue({
      isGenerating: true,
      suggestions: [],
      handleGenerate: mockHandleGenerate,
      clearSuggestions: mockClearSuggestions,
    });

    render(<AiTitleGenerator getPostContent={() => 'Test content'} onSelectTitle={vi.fn()} />);

    const button = screen.getByRole('button', { name: /Generate/i });
    expect(button).toBeDisabled();
  });

  it('renders the suggestions list and changes the button to Regenerate', () => {
    mockUseGenerateTitles.mockReturnValue({
      isGenerating: false,
      suggestions: ['Awesome Title 1', 'Awesome Title 2'],
      handleGenerate: mockHandleGenerate,
      clearSuggestions: mockClearSuggestions,
    });

    render(<AiTitleGenerator getPostContent={() => 'Test content'} onSelectTitle={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Regenerate/i })).toBeInTheDocument();
    expect(screen.getByText('Awesome Title 1')).toBeInTheDocument();
    expect(screen.getByText('Awesome Title 2')).toBeInTheDocument();
  });

  it('calls onSelectTitle and clearSuggestions when clicking on the title', () => {
    mockUseGenerateTitles.mockReturnValue({
      isGenerating: false,
      suggestions: ['Selected Title'],
      handleGenerate: mockHandleGenerate,
      clearSuggestions: mockClearSuggestions,
    });

    const mockOnSelectTitle = vi.fn();
    render(
      <AiTitleGenerator getPostContent={() => 'Test content'} onSelectTitle={mockOnSelectTitle} />
    );

    const suggestionButton = screen.getByText('Selected Title');
    fireEvent.click(suggestionButton);

    expect(mockOnSelectTitle).toHaveBeenCalledWith('Selected Title');
    expect(mockClearSuggestions).toHaveBeenCalledTimes(1);
  });
});
